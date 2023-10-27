import { useQuery } from "react-query";
import { styled } from "styled-components";
import { fetchCoinTickers } from "../api";

const Tab = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 30px;
  border-radius: 50px;
  border: 3px solid black;
  background: linear-gradient(to right, green, blue);
`;
const Tabs = styled.div`
  display: flex;
  flex-direction: column;
`;
const List = styled.span`
  color: ${(props) => props.theme.textColor};
  text-align: left;
  padding: 7px 0px;
  font-size: 20px;
  font-weight: 600;
`;

interface ITickers {
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
}
interface PriceProps {
  coinId: string;
}
function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<ITickers>(["pri", coinId], () =>
    fetchCoinTickers(coinId)
  );
  return (
    <>
      {isLoading ? (
        "price 로딩 중.."
      ) : (
        <Tab>
          <Tabs>
            <List>이름: {data?.name}</List>
            <List>유통 중인 공급량: {data?.circulating_supply}</List>
            <List>총 공급량: {data?.total_supply}</List>
            <List>최대 공급량: {data?.max_supply}</List>
            <List>
              처음 데이터 수집 일자: {data?.first_data_at.slice(0, 10)}
            </List>
            <List>최근 업데이트 일자: {data?.last_updated.slice(0, 10)}</List>
          </Tabs>
        </Tab>
      )}
    </>
  );
}

export default Price;
