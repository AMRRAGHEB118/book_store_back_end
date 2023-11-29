const blackList = new Set();

const addToBlackList = async(token) => {
    blackList.add(token);
  }

module.exports = {blackList ,addToBlackList} 