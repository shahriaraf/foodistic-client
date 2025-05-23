import React, { createContext, useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import auth from "../firebase/firebase.init";
import axios from "axios";
import Spinner from "./Spinner";

// Context to provide user state and auth functions
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state for handling authentication errors

  // Function to create a new user
  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's profile with name and photo URL
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      setUser(user); // Update the user state with the newly created user

      // Generate a JWT token for the newly created user
      const response = await axios.post(
        'https://assignment-11-server-jet-one.vercel.app/jwt',
        { email: user.email }, // Send the email to generate the token
        { withCredentials: true } // Include cookies if your backend uses them
      );
      console.log('JWT token created during sign-up:', response.data);

      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      setError(error.message); // Set error message to be displayed
      throw error;
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };


  // Function to sign in a user
  const signInUser = async (email, password) => {
    setLoading(true); // Start loading state

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user); // Update the user state after successful sign-in

      // Create JWT token by sending user email to backend
      const response = await axios.post('https://assignment-11-server-jet-one.vercel.app/jwt', { email: email }, { withCredentials: true });
      console.log('JWT token:', response.data);

      return user; // Return user object after successful sign-in
    } catch (error) {
      console.error("Error signing in:", error);
      setError(error.message); // Update error state for display
      throw error; // Re-throw error for further handling if needed
    } finally {
      setLoading(false); // Stop loading state
    }
  };


  // Function to sign out the user
  const signOutUser = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase
      setUser(null); // Clear the user state
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Google Authentication Provider
  const googleProvider = new GoogleAuthProvider();

  // Function to sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user); // Update user state with Google login details
      const response = await axios.post(
        'https://assignment-11-server-jet-one.vercel.app/jwt',
        { email: user.email }, // Send the email to generate the token
        { withCredentials: true } // Include cookies if your backend uses them
      );
      console.log('JWT token created during sign-up:', response.data);
      return user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError(error.message); // Set error message to be displayed
      throw error;
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // Firebase Auth state listener to maintain session persistence
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state when the auth state changes
      setLoading(false);    // Set loading to false after checking auth state
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  if (loading) {
    return <Spinner></Spinner> ; // Display a loading indicator while checking auth state
  }

  // Context value to expose user state and auth functions
  const userInfo = {
    user,
    loading,
    error,
    createUser,
    signInUser,
    signOutUser,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children} {/* Render children with access to the auth context */}
    </AuthContext.Provider>
  );
};

// Display error messages to the user
const ErrorMessage = ({ error }) => {
  if (!error) return null;
  return (
    <div style={{ color: 'red', padding: '10px', backgroundColor: '#f8d7da' }}>
      {error}
    </div>
  );
};

export default AuthProvider;