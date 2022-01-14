import React, { useEffect, useState } from "react";
import { database, auth } from "../firebase";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Shoplist = (props) => {
  const shoplistItems = props.shoplist;
  /* const [shoplistItems, setShoplistItems] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user && syncShoplist(user.email);
    });
    console.log("hi");
  }, []);

  const syncShoplist = async (mail) => {
    const shoplistRef = doc(database, "Shoplists", mail);
    const shoplistSnap = await getDoc(shoplistRef);
    if (shoplistSnap.exists()) {
      const data = { ...shoplistSnap.data() };
      setShoplistItems(data);
    }
  }; */

  const handleChange = (event) => {
    const updatedItem = props.shoplist[event.currentTarget.name].ingridient;
    const updatedCount = parseFloat(event.currentTarget.value) || "";
    props.updateShopList(updatedItem, updatedCount);
  };

  const renderShoplist = (key) => {
    const item = shoplistItems[key];
    return (
      <tr key={key}>
        <td>{item.ingridient}:</td>
        <td>
          <input
            name={key}
            type="text"
            value={item.count}
            onChange={handleChange}
          />
        </td>
        <td>{item.measure}</td>
        <td>
          <button
            onClick={() => props.removeFromShoplist(key)}
            className="cancellItem"
          >
            &times;
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="shoplist">
      <h1>Shoplist</h1>
      <table className="shoplist-items">
        <tbody>{Object.keys(shoplistItems).map(renderShoplist)}</tbody>
      </table>
    </div>
  );
};

export default Shoplist;
