export const colors = {
  // 竈門炭治郎のイメージカラー
  primary: {
    green: {
      50: 'bg-green-50',
      100: 'bg-green-100',
      200: 'bg-green-200',
      600: 'border-green-600',
      700: 'bg-green-700',
      800: 'bg-green-800',
    },
    black: 'text-black',
  },
  
  // グラデーション
  gradient: {
    greenLight: 'bg-gradient-to-r from-green-100 to-green-200',
  },
  
  // ボーダー
  border: {
    green: 'border-green-600 border-2',
    greenSingle: 'border border-green-600',
  },
  
  // ボタン
  button: {
    primary: 'bg-green-700 hover:bg-green-800 text-white',
  },
  
  // テキスト
  text: {
    primary: 'text-black',
    white: 'text-white',
  },
} as const;

// ヘルパー関数
export const getCardStyles = () => `${colors.primary.green[50]} ${colors.border.green}`;
export const getButtonStyles = () => colors.button.primary;
export const getTotalVotesStyles = () => `${colors.gradient.greenLight} ${colors.border.greenSingle}`;
export const getTextPrimary = () => colors.text.primary;