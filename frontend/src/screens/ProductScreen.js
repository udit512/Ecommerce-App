import { React, useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Row, Col, Image, ListGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { Button } from "react-bootstrap";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
const ProductScreen = ({ history,match }) => {
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const {  product,  loading,  error  } = productDetails;
  const [qty, setQty] = useState(1)
  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch,  match]);

  const addToCartHandler = () => {
      history.push(`/cart/${match.params.id}/qty?=${qty}`)
  }

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
        {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : <Row>
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

              {product.countInStock > 0 && 
              (<ListGroup.Item>
              <Row>
                <Col>Qty</Col>
                <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x)=> {
                    return(                    
                    <option key={x+1} value={x+1}>
                      {x + 1}
                      </option>
                      )
                  } )}
                </Form.Control>
              </Row>
            </ListGroup.Item>)
              }

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  onClick={addToCartHandler}
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>}
        
      </motion.div>
    </>
  );
};

export default ProductScreen;
