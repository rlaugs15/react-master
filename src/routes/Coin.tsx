import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { styled } from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
  padding: 0px 20px;
`;
const Button = styled.div`
  display: inline-block;
  font-size: 30px;
  background-color: ${(props) => props.theme.divColor};
  padding: 3px;
  width: 40px;
  height: 40px;
  border-radius: 80px;
  text-align: center;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 50px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block; //좌우 공간을 다 차지해서 글이 중앙으로 옴
  font-size: 30px;
  font-weight: 600;
`;
const Overview = styled.div`
  height: 80px;
  background-color: ${(props) => props.theme.divColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  border-radius: 17px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    padding: 6px;
    &:last-child {
      font-size: 26px;
    }
  }
`;
const Description = styled.div`
  font-size: large;
  padding: 13px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 7px;
  margin: 20px 0;
`;
const Tab = styled.span<{ isActive: boolean }>`
  background-color: black;
  text-align: center;
  font-size: 24px;
  padding: 8px 0;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface Params {
  //버전6에선 안 해도 됨
  coinId: string;
}
interface RouteState {
  name: string;
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  first_data_at: string;
  last_data_at: string;
}
interface TickerData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<Params>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch(`/${coinId}/price`);
  const chartMatch = useRouteMatch(`/${coinId}/chart`);
  //한 곳에 2개의 useQuery를 사용할 땐 아래와 같이 이름을 부여해준다.
  //디스트럭처링으로 isLoading과 data라는 값을 추출하고 infoLoading, infoData라는 변수로 저장
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId),
    {
      refetchInterval: 3000, //3초마다 값을 갱신
    }
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<TickerData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );
  /* const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  useEffect(() => {
    //소소한 꿀팁: (함수)()를 하면 즉시 실행된다. 뒤에 ()가 붙기때문
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json(); //코인 정보
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json(); //코인 가격
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]); //훅의 최선의 성능을 위해서는 []에 dependency를 넣어야함 */
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "loading" : infoData?.name}
        </title>
      </Helmet>
      <Button>
        <Link to={"/"}>&lArr;</Link>
      </Button>
      <Header>
        {/*loading ? "loading" : info?.name은 홈페이지로부터 온게 아니라면 실행*/}
        <Title>
          {state?.name ? state.name : loading ? "loading" : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>흠므..</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>RANK:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>SYMBOL:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              {/* 실시간으로 변경하기 위해 useQuery 3번째 인자 */}
              <span>{tickersData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            {/*리액트는 똑똑해서 아래처럼 URL매개변수 써도 됨*/}
            <Route path={`/:coinId/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
export default Coin;
