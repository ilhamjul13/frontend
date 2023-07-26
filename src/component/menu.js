import React, { useState, useEffect } from "react";
import './menu.css';


function App() {
  const [menus, setMenus] = useState([]);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [kategori, setKategori] = useState("");
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await getAllMenus();
      setMenus(response);
    } catch (error) {
      console.error("Error fetching menus:", error);
      // Handle error, show an error message, etc.
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedMenuId) {
        await updateMenu(selectedMenuId, { nama, harga, kategori });
        console.log("Menu updated successfully");
      } else {
        await createMenu({ nama, harga, kategori });
        console.log("Menu created successfully");
      }
      // Clear form fields after submission
      setNama("");
      setHarga("");
      setKategori("");
      setSelectedMenuId(null);
      fetchMenus(); // Refresh the menus list
    } catch (error) {
      console.error("Error:", error);
      // Handle error, show an error message, etc.
    }
  };

  const handleUpdate = (menu) => {
    setNama(menu.nama);
    setHarga(menu.harga);
    setKategori(menu.kategori);
    setSelectedMenuId(menu._id);
  };

  const handleDelete = async (menuId) => {
    try {
      await deleteMenu(menuId);
      console.log("Menu deleted successfully");
      fetchMenus(); // Refresh the menus list
    } catch (error) {
      console.error("Error deleting menu:", error);
      // Handle error, show an error message, etc.
    }
  };

  return (
    <div>
      <h1>ServiceKu</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="NamaHp" />
        <input type="text" value={harga} onChange={(e) => setHarga(e.target.value)} placeholder="kerusakan" />
        <input type="text" value={kategori} onChange={(e) => setKategori(e.target.value)} placeholder="Kategori" />
        <button type="submit">{selectedMenuId ? "Update Menu" : "Create Menu"}</button>
      </form>

      <h1>ServiceKu</h1>
      <table>
        <thead>
          <tr>
            <th>NamaHp</th>
            <th>kerusakan</th>
            <th>Kategori</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu._id}>
              <td>{menu.nama}</td>
              <td>{menu.harga}</td>
              <td>{menu.kategori}</td>
              <td className="action">
              <button onClick={() => handleUpdate(menu)}>Update</button>
              <button style={{ backgroundColor: 'red' }} onClick={() => handleDelete(menu._id)}>Delete</button>
            </td>
            </tr>
          ))}
      </tbody>
    </table>
    </div >
  );
}

export default App;

// API service function

async function createMenu(menuData) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3001/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(menuData),
    });
    if (!response.ok) {
      throw new Error("Error creating menu");
    }
  } catch (error) {
    throw new Error("Error creating menu");
  }
}

async function getAllMenus() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3001/menu", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error fetching menus");
    }
    return response.json();
  } catch (error) {
    throw new Error("Error fetching menus");
  }
}

async function updateMenu(menuId, updateData) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3001/menu/${menuId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      throw new Error("Error updating menu");
    }
    return response.json();
  } catch (error) {
    throw new Error("Error updating menu");
  }
}

async function deleteMenu(menuId) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3001/menu/${menuId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error deleting menu");
    }
  } catch (error) {
    throw new Error("Error deleting menu");
  }
}
