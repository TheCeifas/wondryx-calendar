# Wondryx Calendar — protótipo 0.7.0

Primeiro protótipo instalável do calendário compacto da Wondryx para Foundry VTT v14.

Esta versão aproxima o HUD e a aba **Atualizações do Dia** do layout ilustrado aprovado, preserva a estrutura funcional da versão 0.4 e corrige a identificação oficial do Particles FX.

## Instalação

1. Extraia a pasta `wondryx-calendar` dentro de `Data/modules/` do Foundry.
2. Confirme que `module.json` está diretamente dentro da pasta `wondryx-calendar`.
3. Reinicie o Foundry VTT.
4. Abra o mundo e ative **Wondryx Calendar** em **Gerenciar Módulos**.
5. Use o botão dourado de calendário no canto inferior direito ou o botão da barra compacta.

## O que pode ser testado

- Barra compacta arrastável e redimensionável.
- Sincronização em tempo real com `environment.darknessLevel`, o campo do Foundry v14.
- Calendário real com 28, 29, 30 ou 31 dias e navegação entre meses.
- Seleção do dia e eventos simples.
- Lua ilustrada com fases e luas especiais, sincronizada com o marcador da barra de tempo.
- Estação atual exibida e alterável diretamente no HUD.
- Sol como corpo celeste alternativo.
- Roda ilustrada das quatro estações.
- Clima, umidade, vento, qualidade do ar, pólen e previsão.
- Abas funcionais de Calendário, Clima, Efeitos e Configurações; a estação permanece acessível na tela inicial e no HUD.
- Cinco condições climáticas selecionáveis pelo mestre.
- Chuva, neve e névoa reais pela API pública do FXMaster v8.
- Catálogo dinâmico dos filtros e partículas instalados no FXMaster/FXMaster+.
- Emissões pontuais pelo Particles FX 2.7.0, aplicadas ao token selecionado ou ao centro da tela.
- Sete temas em degradê e fundo central personalizável.
- O fundo escolhido também aparece em degradê na barra de tempo.
- Lua e Sol possuem movimento e brilho suaves, respeitando redução de movimento do navegador.
- Formulário próprio para adicionar eventos, sem diálogo do navegador.
- Aba Atualizações do Dia com Notícias, Eventos, Avisos, visibilidade e anexos de imagem ou PDF.
- A Lua ilustrada é o próprio controle arrastável da barra de horário.
- Persistência mundial das escolhas feitas pelo mestre.
- Aplicação manual da iluminação e sincronização contínua opcional nas configurações do módulo.

## Limites do primeiro protótipo

- Os efeitos ambientais exigem FXMaster v8 ativo; emissões pontuais exigem Particles FX 2.7.0. Sem eles, os controles correspondentes ficam indisponíveis.
- A previsão é demonstrativa e ainda não possui gerador climático.
- Jogadores podem visualizar, mas as alterações persistentes são reservadas ao mestre.
- Não foi executado dentro de uma instância real do Foundry nesta sessão.



## Wondryx — autoria e licença de uso

Projeto de Fernando Marques, Gustavo Arcanjo e Francisco Taylor. Site: https://wondryx.cloud. Consulte [LICENSE.md](LICENSE.md), [AUTHORS.md](AUTHORS.md) e [CREDITS.md](CREDITS.md).

Após o fim da assinatura, o cliente pode continuar usando as versões legitimamente baixadas, mas perde acesso a novos downloads e atualizações. Não é autorizada a redistribuição, o compartilhamento de credenciais ou a alteração de código protegido sem autorização, ressalvadas configurações permitidas e direitos legais/de terceiros.
