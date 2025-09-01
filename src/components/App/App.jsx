import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { useEffect, useState } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, addItem, removeItem, updateUser } from "../../utils/api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { register, authorize, checkToken } from "../../utils/auth";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { addCardLike, removeCardLike } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    condition: "",
    city: "",
    isDay: false,
  });
  const [itemToDelete, setItemToDelete] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const closeActiveModal = () => {
    setActiveModal(""); // any modal
    setIsLoginModalOpen(false); // login modal
    setIsRegisterModalOpen(false); // register modal
    setIsEditProfileModalOpen(false); // edit profile modal
  };

  // Universal submit handler for loading states and modal closing
  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };
  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setActiveModal("confirm-delete");
  };

  const handleAddItemModalSubmit = (
    { name, imageUrl, weatherType },
    resetForm
  ) => {
    const makeRequest = () => {
      const token = localStorage.getItem("jwt");
      return addItem({ name, imageUrl, weatherType }, token).then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        resetForm();
      });
    };

    handleSubmit(makeRequest);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      const makeRequest = () => {
        const token = localStorage.getItem("jwt");
        return removeItem(itemToDelete, token).then(() => {
          setClothingItems((prevItems) =>
            prevItems.filter((item) => item._id !== itemToDelete)
          );
          setItemToDelete(null);
        });
      };

      handleSubmit(makeRequest);
    }
  };

  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);
  const handleCloseRegisterModal = () => setIsRegisterModalOpen(false);
  const handleRegister = (formData) => {
    const makeRequest = () => {
      return register(formData)
        .then(() => {
          return authorize({
            email: formData.email,
            password: formData.password,
          });
        })
        .then((res) => {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        })
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        });
    };
    handleSubmit(makeRequest);
  };

  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);
  const handleLogin = (formData) => {
    const makeRequest = () => {
      return authorize(formData)
        .then((res) => {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        })
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        });
    };
    handleSubmit(makeRequest);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleOpenEditProfileModal = () => setIsEditProfileModalOpen(true);
  const handleCloseEditProfileModal = () => setIsEditProfileModalOpen(false);

  const handleUpdateUser = ({ name, avatar }) => {
    const makeRequest = () => {
      const token = localStorage.getItem("jwt");
      return updateUser({ name, avatar }, token).then((updatedUser) => {
        setCurrentUser(updatedUser);
      });
    };
    handleSubmit(makeRequest);
  };

  // Handle like/unlike functionality for clothing items
  const handleCardLike = ({ _id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!isLiked) {
      addCardLike(_id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch(console.error);
    } else {
      removeCardLike(_id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch(console.error);
    }
  };

  // Check authentication token on app load
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setCurrentUser(null);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onSignUp={handleOpenRegisterModal}
              onSignIn={handleOpenLoginModal}
              onSignOut={handleSignOut}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      onEditProfile={handleOpenEditProfileModal}
                      onSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItemModalSubmit={handleAddItemModalSubmit}
            isLoading={isLoading}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteClick={handleDeleteClick}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "confirm-delete"}
            onClose={closeActiveModal}
            onConfirm={handleConfirmDelete}
            isLoading={isLoading}
          />
          {isRegisterModalOpen && (
            <RegisterModal
              isOpen={isRegisterModalOpen}
              onClose={handleCloseRegisterModal}
              onRegister={handleRegister}
              onSignIn={handleOpenLoginModal}
              isLoading={isLoading}
            />
          )}
          {isLoginModalOpen && (
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={handleCloseLoginModal}
              onLogin={handleLogin}
              onSignUp={handleOpenRegisterModal}
              isLoading={isLoading}
            />
          )}
          {isEditProfileModalOpen && (
            <EditProfileModal
              isOpen={isEditProfileModalOpen}
              onClose={handleCloseEditProfileModal}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
