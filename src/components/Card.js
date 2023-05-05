import React, { useState, useEffect, CSSProperties } from "react";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

const Card = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setISLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [limit, setLimit] = useState(10);

  const fetchData = (total) => {
    try {
      fetch("https://dummyjson.com/products?limit=" + total)
        .then((res) => res.json())
        .then((res) => {
          setProducts(res.products);
          setRecords(res.products);

          setISLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setISLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(10);
  }, []);

  const Filter = (e) => {
    setRecords(products.filter((f) => f.id == e.target.value));
    console.log(e.target.value);
  };
  return (
    <>
      <Loading>
        <select onChange={Filter}>
          {products.map((prod) => {
            return (
              <option key={prod.id} value={prod.id}>
                {prod.brand}
              </option>
            );
          })}
        </select>

        <select
          onChange={(e) => {
            setLimit(e.target.value);
            fetchData(e.target.value);
          }}
          defaultValue={1}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </Loading>
      {isLoading ? (
        <Loader>
          <ClipLoader
            color={"#515151"}
            loading={isLoading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Loader>
      ) : (
        records.map((product, i) => {
          return (
            <Container key={i}>
              <Main>
                <CardImg>
                  <img src={product.images[0]} alt="phone img" />
                </CardImg>
                <CardInf>
                  <Title>{product.title}</Title>
                  <Description>{product.description}</Description>
                  <Price>Price: {product.price} $ </Price>
                </CardInf>
              </Main>
            </Container>
          );
        })
      )}
    </>
  );
};

export default Card;

const Container = styled.div``;

const Main = styled.div`
  width: 300px;
  height: 550px;
  margin-top: 80px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  column-gap: 10;
`;
const Loader = styled.div`
  position: absolute;
`;
const Loading = styled.div`
  position: absolute;
  left: 110px;
  top: 0;
  font-family: Arial;

  select {
    padding: 5px;
    background-color: "DodgerBlue";

    option {
      padding: 5px;
    }
  }
`;
const CardImg = styled.div`
  width: 100%;
  height: 50%;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
  }
`;
const CardInf = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  width: 100%;
  font-size: 24px;
  text-align: center;
  font-weight: 700;
`;
const Description = styled.div`
  width: 100%;
  padding: 10px;
  text-align: center;
  font-size: 12px;
`;

const Price = styled.div`
  text-align: end;
  padding: 10px;
`;
