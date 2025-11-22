import React, { useState } from "react";

function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedName = name.trim();
    if (trimmedName === "") return;

    const itemData = {
      name: trimmedName,
      category: category,
      isInCart: false,
    };

    setIsSubmitting(true);

    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
      .then((r) => {
        if (!r.ok) throw new Error(`Request failed: ${r.status}`);
        return r.json();
      })
      .then((newItem) => {
        onAddItem(newItem);
        setName("");
        setCategory("Produce");
      })
      .catch((err) => {
        console.error("Error creating item:", err);
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit" disabled={isSubmitting || name.trim() === ""}>
        {isSubmitting ? "Adding..." : "Add to List"}
      </button>
    </form>
  );
}

export default ItemForm;
