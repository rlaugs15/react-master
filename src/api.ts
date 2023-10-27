export function fetchCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json()
  );
}

export function fetchCoinInfo(coinId: String) {
  return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then((res) =>
    res.json()
  );
}

export function fetchCoinTickers(coinId: String) {
  return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then((res) =>
    res.json()
  );
}

export function fetchCoinHistory(coinId: String) {
  //const endDate = Math.floor(Date.now() / 1000);
  //const startDate = endDate - 60 * 60 * 24 * 7;
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
    //`https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${startDate}`
  ).then((res) => res.json());
}
