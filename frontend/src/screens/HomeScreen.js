import { motion } from "framer-motion";
import { React, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList)
  const {products,loading,error} = productList
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

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
      
        <h1>Latest Products</h1>
        {loading ? <Loader/> : error ? <Message variant="danger" >{error}</Message> : 
        <motion.div
        initial="out"
        animate="in"
        exit="in"
        variants={variants}
        transition={transitions}
      >
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
        }
        
      
    </>
  );
};

export default HomeScreen;
