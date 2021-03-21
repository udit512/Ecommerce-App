import { motion } from "framer-motion";
import { React, useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get("http://127.0.0.1:5000/api/products");
      setProducts(data);
    };

    fetchProduct();
  }, []);

  const variants = {
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: "-100vh",
    },
  };
  const transitions = {
    type: "tweak",
    stifness: 50,
  };
  return (
    <>
      <motion.div
        initial="out"
        animate="in"
        exit="in"
        variants={variants}
        transition={transitions}
      >
        <h1>Latest Products</h1>
        <Row>
          {products.map((product) => {
            return (
              <Col sm={6} md={6} lg={4} xl={3} className="">
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      </motion.div>
    </>
  );
};

export default HomeScreen;
