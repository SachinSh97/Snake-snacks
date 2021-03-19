export const StartPageConfig = {};

export const snakeGameConfig = {};

export const resource = {
  gameContainerConfig: {},
  startContainerConfig: {
    heading: "Snake & Snack",
    letBeginCTA: "Let's Begin",
    topScoreCTA: "Top Score's",
    topPlayerCTA: "Top Player's",
    loginCTA: "Login",
    logoutCTA: "Logout",
    toolTipText: "Please login first!",
  },
  configurationPopupConfig: {
    title: "Game Configuration",
    label: {
      area: "Area Of Board",
      level: "Difficulty Level",
    },
    placeholder: {
      area: { width: "width", height: "height" },
    },
    errorMessage: {
      area: "Enter width/height between 200",
      level: "Enter difficulty level between 1-5",
    },
  },
  topPlayerPopupConfig: {
    title: "Top player's",
  },
  topTenScorePopupConfig: {
    title: "Top Score's",
  },
  verificationPopupConfig: {
    title: "Username",
    placeholder: {
      username: "Username",
    },
    ctaBtn: "Let's Go",
  },
};
