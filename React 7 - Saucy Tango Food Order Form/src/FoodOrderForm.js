import React, { useState } from "react";

function FoodOrderForm() {
  function handleSubmit(e) {
    e.preventDefault();
  alert(`Order Successful!\n\nYour order was: ${order}.\n\nPlease show your confirmation number for pickup.`);
  }
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [order, setOrder] = useState("");
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input value={name} onChange={(e) => setName(e.target.value)} name="name" type="text" id="name" />

      <label htmlFor="phone">Phone: </label>
      <input value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" type="tel" id="phone" />

      <label htmlFor="address">Address: </label>
      <input value={address} onChange={(e) => setAddress(e.target.value)} name="address" type="text" id="address" />

      <label htmlFor="order">Order: </label>
      <input value={order} onChange={(e) => setOrder(e.target.value)} name="order" type="text" id="order" />

      <button type="submit">Submit Order</button>
    </form>
  )
}

export default FoodOrderForm;