import React, { useEffect, useRef } from "react";
import "./App.css";
import "./css/Home.css";
import bg from "./images/background.jpg";
import Header from "./Header";
import OwnedProductComponent from "./OwnedProductComponent";
import ShippedProductComponent from "./ShippedProductComponent";
import Web3 from "web3";
import SupplyChain from "./contractBuilds/SupplyChain.json";
import ProductDetailsComponent from "./ProductDetailsComponent";

import { OWNERADDRESS, CONTRACTADDRESS } from "./constants";
import { useState } from "react";
const web3_utils = require("web3-utils");

export default () => {
  const [accountAddress, setAccountAddress] = useState();
  const [ownedProducts, setOwnedProducts] = useState();
  const [shippedProducts, setShippedProducts] = useState([]);
  const [supplyChainContract, setContract] = useState();
  const [displayDetails, setDisplayDetails] = useState(false);
  const [productDetails, setProductDetails] = useState();
  const [shippedDisplay, setShippedDisplay] = useState(false);
  const [ownedDisplay, setOwnedDisplay] = useState(false);
  const [productId, setproductId] = useState("");
  let web3;

  const init = async () => {
    let provider = window.ethereum;
    if (typeof provider !== "undefined") {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setAccountAddress(accounts[0]);
        })
        .catch((error) => {});

      window.ethereum.on("accountsChanged", function(accounts) {
        setAccountAddress(accounts[0]);
      });
    }
    web3 = new Web3(provider);
    setContract(new web3.eth.Contract(SupplyChain.abi, CONTRACTADDRESS));
  };

  const fetchOwnedProducts = async () => {
    let output = await supplyChainContract.methods
      .getOwnedProducts(accountAddress)
      .call({ from: accountAddress, gas: 80000000 });
    setOwnedProducts(output);
  };

  const fetchShippedProducts = async () => {
    let output = await supplyChainContract.methods
      .getShippedProducts(accountAddress)
      .call({ from: accountAddress, gas: 80000000 });
    setShippedProducts(output);
  };

  const receiveProductByRetailer = async (productId, productPrice) => {
    let transaction = await supplyChainContract.methods
      .receivedbyretailer(productId)
      .send({
        from: accountAddress,
        value: web3_utils.toWei(productPrice.toString()),
      })
      .catch((error) => {
        console.log(error);
      });

    return transaction;
  };

  const ReceiveProductRetailerComponent = () => {
    const [productId, setproductId] = useState("");
    const [productPrice, setproductPrice] = useState("");

    const submitValue = async () => {
      let output = await receiveProductByRetailer(productId, productPrice);

      if (output !== undefined) {
        alert("transaction successful" + JSON.stringify(output));
      } else {
        alert("transaction unsuccessful");
      }
    };

    return (
     
       
        <div className="container containgpddistp">
        <div className="form--Signup">
          <div className="form--heading">Receive Product</div>
          <input
          type="text"
          placeholder="Product ID"
          onChange={(e) => setproductId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pay Price"
          onChange={(e) => setproductPrice(e.target.value)}
        />
          <button className="button" onClick={submitValue}>
            Submit
          </button>
        </div>
      </div>
   
    );
  };

  const ForSaleByRetailerComponent = () => {
    const [productId, setproductId] = useState("");
    const [productPrice, setproductPrice] = useState("");
    const submitValue = async () => {
      let output = await saleByRetailer(productId, productPrice);

      if (output) {
        alert("Product Added for Sale");
      } else {
        alert("Transaction Failed, check authentication once");
      }
    };

    return (
    
        <div className="container containgpddistp">
        <div className="form--Signup">
          <div className="form--heading">Add Product to Sale</div>
          <input
          type="text"
          placeholder="Product ID"
          onChange={(e) => setproductId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Price"
          onChange={(e) => setproductPrice(e.target.value)}
        />
          <button className="button" onClick={submitValue}>
            Submit
          </button>
        </div>
      </div>
    
    );
  };

  const saleByRetailer = async (productId, price) => {
    let transactionStatus = false;
    await supplyChainContract.methods
      .forsalebyretailer(productId, web3_utils.toWei(price.toString()))
      .send({ from: accountAddress })
      .then((transaction) => {
        transactionStatus = true;
      })
      .catch((error) => {
        console.log(error);
      });

    return transactionStatus;
  };

  const shippedByRetailer = async (productId, shippedToAddress) => {
    let transactionStatus = false;
    await supplyChainContract.methods
      .shippedbyretailer(productId, shippedToAddress)
      .send({ from: accountAddress })
      .then((transaction) => {
        transactionStatus = true;
      })
      .catch((error) => {
        console.log(error);
      });
    return transactionStatus;
  };

  const ShippedByRetailerComponent = () => {
    const [productId, setproductId] = useState("");
    const [shippedToAddress, setshippedToAddress] = useState("");
    const submitValue = async () => {
      let output = await shippedByRetailer(productId, shippedToAddress);
      if (output) {
        alert("Product Added for Sale");
      } else {
        alert("Transaction Failed, check authentication once");
      }
    };

    return (
      
        <div className="container containgpddistp">
        <div className="form--Signup">
          <div className="form--heading">Ship Product</div>
          <input
          type="text"
          placeholder="Product ID"
          onChange={(e) => setproductId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          onChange={(e) => setshippedToAddress(e.target.value)}
        />
          <button className="button" onClick={submitValue}>
            Submit
          </button>
        </div>
      </div>
   
    );
  };

  const FindProductComponent = () => {
    const getProductDetails = async (productid) => {
      let productState = -1;
      let details = await supplyChainContract.methods
        .productDetail(productid)
        .call({ from: accountAddress })
        .catch((error) => {
          console.log(error);
        });
      if (details["uin"] == 0) {
        return undefined;
      }
      productState = details["productState"];

      let events = [];

      const e1 = await supplyChainContract.getPastEvents("allEvents", {
        filter: { uid: productid },
        fromBlock: 0,
        toBlock: "latest",
      });

      for (var j of e1) {
        if (j.returnValues.uin == productid) {
          events.push(j);
        }
      }

      return [details, events];
    };

    const submitValue = async () => {
      let fetched = await getProductDetails(productId);
      if (fetched === undefined) {
        alert("PRODUCT NOT FOUND");
        return;
      }
      setProductDetails(fetched);
      setOwnedDisplay(false);
      setShippedDisplay(false);
      setDisplayDetails(true);
    };

    return (

        <div className="container containgpddistp">
        <div className="form--Signup">
          <div className="form--heading">Get Product Details</div>
          <input
          type="text"
          placeholder="Product ID"
          onChange={(e) => setproductId(e.target.value)}
        />
          <button className="button" onClick={submitValue}>
            Submit
          </button>
        </div>
      </div>
    
    );
  };

  const handleOwnedClick = () => {
    fetchOwnedProducts();
    setShippedDisplay(false);
    setDisplayDetails(false);
    setOwnedDisplay(true);
  };

  const handleShippedClick = () => {
    fetchShippedProducts();
    setOwnedDisplay(false);
    setDisplayDetails(false);
    setShippedDisplay(true);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    

      <div className="ownerpage">
      <Header accountAddress={accountAddress} />
      <img src={bg} alt="banner.jpg" className="home__banner" />
      <div className="ownerpageform">
        <div className="rows row1">
        <ReceiveProductRetailerComponent />
      <ForSaleByRetailerComponent />
        </div>

        <div className="rows row2">
        <ShippedByRetailerComponent />
      <FindProductComponent />
        </div>

        <div className="rows row3">
        <button className="buttonss" onClick={handleOwnedClick}>Owned Products</button>
      <button className="buttonss" onClick={handleShippedClick}>Shipped Products</button>

      {ownedProducts && ownedDisplay ? (
        <OwnedProductComponent owned={ownedProducts} />
      ) : (
        ""
      )}
      {shippedProducts && shippedDisplay ? (
        <ShippedProductComponent shipped={shippedProducts} />
      ) : (
        ""
      )}
      {productDetails && displayDetails ? (
      <div className="container4">
            <ProductDetailsComponent details={productDetails} />
            </div>
      ) : (
        ""
      )}
        </div>
      </div>
    </div>

 
  );
};
