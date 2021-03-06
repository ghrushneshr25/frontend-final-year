import React, { useEffect, useRef } from "react";
import "./App.css";
import "./css/Home.css";
import ProductDetailsComponent from "./ProductDetailsComponent";
import Web3 from "web3";
import SupplyChain from "./contractBuilds/SupplyChain.json";
import { CONTRACTADDRESS } from "./constants";
import { useState } from "react";
import bg from "./images/background.jpg";
import Header from "./Header";
import Home from "./Home";

export default () => {
  const [accountAddress, setAccountAddress] = useState();
  const [supplyChainContract, setContract] = useState();

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

  const AddManufacturerComponent = () => {
    const [address, setAddress] = useState("");

    const submitValue = async () => {
      let output = await supplyChainContract.methods
        .addManufacturer(address)
        .send({ from: accountAddress })
        .catch((error) => {
          console.log(error);
        });
      if (output !== undefined) {
        alert("Manufacturer Added");
      } else {
        alert("Manufacturer Not Added");
      }
    };

    return (
      <div className="container">
        <div className="form--Signup">
          <div className="form--heading">Add Manufacturer</div>
          <input
            type="text"
            placeholder="Manufacturer Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <button className="button" onClick={submitValue}>
            Submit
          </button>
        </div>
      </div>
    );
  };

  const AddDistributorComponent = () => {
    const [address, setAddress] = useState("");

    const submitValue = async () => {
      let output = await supplyChainContract.methods
        .addDistributor(address)
        .send({ from: accountAddress })
        .catch((error) => {
          console.log(error);
        });
      if (output !== undefined) {
        alert("Distributor Added");
      } else {
        alert("Distributor Not Added");
      }
    };

    return (
      <div className="container">
        <div className="form--Signup">
          <div className="form--heading">Add Distributor</div>

          <input
            type="text"
            placeholder="Manufacturer Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <button className="button" onClick={submitValue}>
            Submit
          </button>
        </div>
      </div>
    );
  };

  const AddRetailerComponent = () => {
    const [address, setAddress] = useState("");

    const submitValue = async () => {
      let output = await supplyChainContract.methods
        .addRetailer(address)
        .send({ from: accountAddress })
        .catch((error) => {
          console.log(error);
        });
      if (output !== undefined) {
        alert("Retailer Added");
      } else {
        alert("Retailer Not Added");
      }
    };

    return (
      <div className="container">
        <div className="form--Signup">
          <div className="form--heading">Add Retailer</div>

          <input
            type="text"
            placeholder="Manufacturer Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <button className="button" onClick={submitValue}>
            Submit
          </button>
        </div>
      </div>
    );
  };

  const AddConsumerComponent = () => {
    const [address, setAddress] = useState("");

    const submitValue = async () => {
      let output = await supplyChainContract.methods
        .addConsumer(address)
        .send({ from: accountAddress })
        .catch((error) => {
          console.log(error);
        });
      if (output !== undefined) {
        alert("Consumer Added");
      } else {
        alert("Consumer Not Added");
      }
    };

    return (
      <div className="container">
        <div className="form--Signup">
          <div className="form--heading">Add Consumer</div>

          <input
            type="text"
            placeholder="Manufacturer Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <button className="button" onClick={submitValue}>
            Submit
          </button>
        </div>
      </div>
    );
  };

  const [displayDetails, setDisplayDetails] = useState(false);
  const [productDetails, setProductDetails] = useState();
  const FindProductComponent = () => {
    const [productId, setproductId] = useState("");

    const getProductDetails = async (productId) => {
      let productState = -1;
      let details = await supplyChainContract.methods
        .productDetail(productId)
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
        filter: { uid: productId },
        fromBlock: 0,
        toBlock: "latest",
      });

      for (var j of e1) {
        if (j.returnValues.uin == productId) {
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
      setDisplayDetails(true);
    };

    return (
      <div className="container ">
        <div className="form--Signup">
          <div className="form--heading">Get Product Details</div>
          <div>
            <input
              type="text"
              placeholder="Product ID"
              onChange={(e) => setproductId(e.target.value)}
            />
            <button className="button" onClick={submitValue}>
              Submit
            </button>
            {/* {productDetails && displayDetails ? (
              <ProductDetailsComponent details={productDetails} />
            ) : (
              ""
            )} */}
          </div>
        </div>
      </div>
    );
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
          <AddManufacturerComponent />
          <AddDistributorComponent />
        </div>

        <div className="rows row2">
          <AddRetailerComponent />
          <AddConsumerComponent />
        </div>

        <div className="rows row3">
          <FindProductComponent />
        </div>
        {productDetails && displayDetails ? (
          <div className="container container1">
            <ProductDetailsComponent details={productDetails} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
