import React, { useContext, useEffect, useState } from "react";
import "./User.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from "../../assets/assets";
// import { toast } from 'react-toastify';

const Profile = () => {
  const { token, url } = useContext(StoreContext);

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const getUser = async () => {
    const response = await axios.post(
      url + "/api/user/get",
      {},
      { headers: { token } }
    );
    if (response.data.success) {
      const userData = response.data.data;
      setUser(userData);

      if (userData.address) {
        setData({
          name: userData.name,
          email: userData.email,
          phone: userData.phoneNumber,
          address: userData.address,
        });
      } else {
        setData({
          name: userData.name,
          email: userData.email,
          phone: userData.phoneNumber,
        });
      }
      if (userData.picture) {
        setImage(url + "/images/" + userData.picture);
      }
    } else {
      console.log("Error");
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    getUser();
  }, [token]);

  const SaveProfile = async (event) => {
    event.preventDefault();
    if (
      data.name !== user.name ||
      data.email !== user.email ||
      data.phone !== user.phone
    ) {
      event.preventDefault();
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      formData.append("image", image);
      const response = await axios.put(url + "/api/user/modify", formData, {
        headers: { token },
      });
      if (response.data.success) {
        console.log(response.data.message);
      } else {
        console.log(response.data.message);
      }
    }
  };

  return (
    <div className="profile">
      <div className="grid wide">
        <div className="row container">
          <div className="col l-3 side-bar">
            <a
              onClick={() => navigate("/profile")}
              className="sidebar-child current"
            >
              <i className="fa-regular fa-user"></i>
              <p>My Account</p>
            </a>
            <a onClick={() => navigate("/myorders")} className="sidebar-child">
              <i className="fa-solid fa-clipboard-list"></i>
              <p>My Purchase</p>
            </a>
          </div>

          <div className="col l-9 User-Information">
            <div className="User-Information__Title">Hồ Sơ Của Tôi</div>
            <div className="User-Information__Overview">
              Quản lý thông tin hồ sơ để bảo mật tài khoản
            </div>

            <form onSubmit={SaveProfile}>
              <div className="row sm--gutter">
                <div className="col l-8 User-Information__Description">
                  <div className="row sm--gutter User-Information_Description--Detail">
                    <div className="col l-5 User-Information_Description--Detail--Modify ">
                      Tên
                    </div>
                    <input
                      className="col l-7 User-Information__Description--Detail--Modify--Input"
                      required
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className="row sm--gutter User-Information_Description--Detail">
                    <div className="col l-5 User-Information_Description--Detail--Modify">
                      Email
                    </div>

                    <input
                      required
                      className="col l-7 User-Information__Description--Detail--Modify--Input"
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className="row sm--gutter User-Information_Description--Detail">
                    <div className="col l-5 User-Information_Description--Detail--Modify">
                      Số điện thoại
                    </div>
                    <input
                      required
                      className="col l-7 User-Information__Description--Detail--Modify--Input"
                      type="tel"
                      name="phone"
                      value={data.phone}
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className="row sm--gutter User-Information__Description--Detail User-Infomation__Description--Address2">
                    <div className="col l-5 User-Information_Description--Detail--Modify User-Information_Description--Detail--Modify--Option">
                      Địa chỉ
                    </div>

                    <input
                      required
                      className="col l-7 User-Information__Description--Detail--Modify--Input"
                      type="text"
                      name="address"
                      value={data.address}
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>

                <div className="col l-4 User-Information__Update-Avatar" style={{ paddingLeft: "80px", paddingTop: "14px" }}>
                  <img
                    src={image ? image : assets.defaultAvatar}
                    className="User-Infomation__Update-Avatar--Avatar"
                    alt=""
                  />
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    id="image"
                    hidden
                    required
                  />
                  <label
                    htmlFor="image"
                    className="User-Infomation__Upload-Button"
                  >
                    Chọn ảnh
                  </label>
                </div>
              </div>

              <div className="User-Infomation__Description--Save">
                <button type="submit" style={{ height: "32px", width: "78px" }}>
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
