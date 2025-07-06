const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');

const token = fs.readFileSync(path.join(__dirname, 'token.txt'), 'utf-8').trim();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

// 슬래시 명령어 로딩
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
}

// 이벤트 핸들러 로딩 (에러 포함)
const eventsPath = path.join(__dirname, 'event');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(path.join(eventsPath, file));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// 버튼 인터랙션 처리 (에러 핸들러와 별도로)
client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isButton()) {
    if (interaction.customId === 'register_yes') {
      await interaction.update({
        embeds: [{ color: 0x57f287, description: '✅ 가입이 성공되었습니다!' }],
        components: [],
        ephemeral: true,
      });
    }

    if (interaction.customId === 'register_no') {
      await interaction.update({
        embeds: [{ color: 0xed4245, description: '❌ 가입이 취소되었어요.' }],
        components: [],
        ephemeral: true,
      });
    }
  }
});

client.login(token);
