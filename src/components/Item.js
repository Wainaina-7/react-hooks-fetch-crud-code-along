import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  function handleToggleCart() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isInCart: !item.isInCart }),
    })
      .then((r) => r.json())
      .then((updated) => {
        if (onUpdateItem) onUpdateItem(updated);
      })
      .catch((err) => console.error("Error updating item:", err));
  }

  function handleDelete() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          if (onDeleteItem) onDeleteItem(item.id);
        } else {
          throw new Error(`Delete failed: ${r.status}`);
        }
      })
      .catch((err) => console.error("Error deleting item:", err));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleToggleCart}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

export default Item;
