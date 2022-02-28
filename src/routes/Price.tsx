import styled, { StyledProps } from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  grid-auto-rows: minmax(25px, auto);
  /* grid-auto-columns: minmax(200px, auto); */
`;

const ColumnLabel = styled.div`
  color: orange;
  /* margin-top: ; */
  /* justify-content: center;
  align-items: center; */
  /* vertical-align: middle; */
  text-align: center;
`;

const ColumnInfo = styled.div`
  text-align: left;
`;

interface PriceProps {
  coinTickers: ICoinTickers | undefined;
}

interface ICoinTickers {
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: string;
  percent_from_price_ath: number;
}

function Price({ coinTickers }: PriceProps) {
  return (
    <Container>
      <ColumnLabel> Market Cap</ColumnLabel>
      <ColumnInfo> ${coinTickers?.market_cap}</ColumnInfo>
      <ColumnLabel> ATH Price</ColumnLabel>
      <ColumnInfo>
        ${coinTickers?.ath_price}
        <br />( {coinTickers?.ath_date} )
      </ColumnInfo>
      <ColumnLabel> Market Change 24h</ColumnLabel>
      <ColumnInfo> {coinTickers?.market_cap_change_24h}%</ColumnInfo>
      <ColumnLabel> Volume 24h</ColumnLabel>
      <ColumnInfo> ${coinTickers?.volume_24h}</ColumnInfo>
      <ColumnLabel> Volume Change 24h</ColumnLabel>
      <ColumnInfo> {coinTickers?.volume_24h_change_24h}%</ColumnInfo>
      <ColumnLabel> Price Chagne 15m</ColumnLabel>
      <ColumnInfo> {coinTickers?.percent_change_15m}%</ColumnInfo>
      <ColumnLabel> Price Chagne 30m</ColumnLabel>
      <ColumnInfo> {coinTickers?.percent_change_30m}%</ColumnInfo>
      <ColumnLabel> Price Chagne 1h</ColumnLabel>
      <ColumnInfo> {coinTickers?.percent_change_1h}%</ColumnInfo>
      <ColumnLabel> Price Chagne 6h</ColumnLabel>
      <ColumnInfo> {coinTickers?.percent_change_6h}%</ColumnInfo>
      <ColumnLabel> Price Chagne 12h</ColumnLabel>
      <ColumnInfo> {coinTickers?.percent_change_12h}%</ColumnInfo>
      <ColumnLabel> Price Chagne 1d</ColumnLabel>
      <ColumnInfo> {coinTickers?.percent_change_24h}%</ColumnInfo>
      <ColumnLabel> Price Chagne 7d</ColumnLabel>
      <ColumnInfo> {coinTickers?.percent_change_7d}%</ColumnInfo>
      <ColumnLabel> Price Chagne 30d</ColumnLabel>
      <ColumnInfo> {coinTickers?.percent_change_30d}%</ColumnInfo>
      <ColumnLabel> Price Chagne 1y</ColumnLabel>
      <ColumnInfo> {coinTickers?.percent_change_1y}%</ColumnInfo>
    </Container>
  );
}
export default Price;
