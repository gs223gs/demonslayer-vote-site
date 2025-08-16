export type Language = 'ja' | 'en';

export const translations = {
  ja: {
    common: {
      siteName: '鬼滅の刃 投票サイト',
      totalVotes: '総投票数',
      votes: '票',
      ranking: 'ランキング',
      vote: '投票',
      voteAndRanking: '投票/ランキング',
      home: 'ホーム',
    },
    home: {
      title: '鬼滅の刃 無限城編 投票サイト ~200億の人物は誰だ?~',
      catchCopy: '君の一票で活躍した人を200億の人物にしよう!',
      description: 'この映画で最も活躍したキャラクターに投票して、200億の人物を決めよう！',
    },
    vote: {
      voteButton: '投票する',
      alreadyVoted: '投票済み',
      showRankingPrompt: '投票して現在のランキングをみよう!',
      thankYouMessage: 'ご投票ありがとうございました！',
    },
    error: {
      voteFailed: '投票に失敗しました',
      networkError: 'ネットワークエラーが発生しました',
      retry: '再試行',
    },
    characters: {
      tanjiro: '竈門炭治郎',
      akaza: '猗窩座',
      kagaya: '産屋敷耀哉',
    },
    share: {
      tweetVote: 'に投票しました！',
      tweetRanking: '現在のランキング',
      tweetButton: 'ツイートする',
      tweetRankingButton: 'ランキングをツイート',
      hashtags: '#鬼滅の刃 #無限城編 #200億の人物',
    },
    categories: {
      demon: '鬼',
      corps: '隊士',
      civilian: '非隊士',
    },
  },
  en: {
    common: {
      siteName: 'Demon Slayer Voting Site',
      totalVotes: 'Total Votes',
      votes: 'votes',
      ranking: 'Ranking',
      vote: 'Vote',
      voteAndRanking: 'Vote/Ranking',
      home: 'Home',
    },
    home: {
      title: 'Demon Slayer: Infinity Castle Arc Voting Site ~Who is the 20 billion person?~',
      catchCopy: 'Make the character who played an active role the 20 billion person with your vote!',
      description: 'Vote for the character who was most active in this movie and decide the 20 billion person!',
    },
    vote: {
      voteButton: 'Vote',
      alreadyVoted: 'Already Voted',
      showRankingPrompt: 'Vote to see the current ranking!',
      thankYouMessage: 'Thank you for voting!',
    },
    error: {
      voteFailed: 'Failed to vote',
      networkError: 'Network error occurred',
      retry: 'Retry',
    },
    characters: {
      tanjiro: 'Kamado Tanjiro',
      akaza: 'Akaza',
      kagaya: 'Ubuyashiki Kagaya',
    },
    share: {
      tweetVote: 'I voted for',
      tweetRanking: 'Current Ranking',
      tweetButton: 'Tweet',
      tweetRankingButton: 'Tweet Ranking',
      hashtags: '#DemonSlayer #InfinityCastle #20BillionPerson',
    },
    categories: {
      demon: 'Demons',
      corps: 'Demon Slayers',
      civilian: 'Civilians',
    },
  },
} as const;

export type TranslationKeys = typeof translations.ja;