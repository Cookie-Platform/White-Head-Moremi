const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('가입')
    .setDescription('하얀 머리 모레미에 가입합니다.'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('가입')
      .setDescription(
        '정말로 하얀 머리 모레미에 가입하시겠어요?\n가입하시면 하얀 머리 모레미의 운영정책과 개인정보처리방침에 동의하는 것으로 간주합니다.'
      )
      .setColor('Green');

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('register_yes')
        .setLabel('가입')
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId('register_no')
        .setLabel('가입 취소')
        .setStyle(ButtonStyle.Danger)
    );

    await interaction.reply({
      embeds: [embed],
      components: [buttons],
      ephemeral: true, // 다른 사람 안 보이게
    });
  },
};
