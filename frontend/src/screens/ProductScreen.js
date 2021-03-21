import { React, useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { Button } from "react-bootstrap";
const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:5000/api/products/${match.params.id}`
      );
      setProduct(data);
    };

    fetchProduct();
  }, [match]);
  const variants = {
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: "+100vh",
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
        <Link class="btn btn-dark my-3" to="/">
          GO BACK
        </Link>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={` ${product.numReviews} Reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description : {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Sold Out"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </motion.div>
    </>
  );
};

export default ProductScreen;
