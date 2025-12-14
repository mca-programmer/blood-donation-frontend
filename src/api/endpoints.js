// src/api/endpoints.js

export const ENDPOINTS = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    googleLogin: "/auth/google-login", 
  },
  users: {
    all: "/users",
    updateStatus: (id) => `/users/${id}/status`,
    updateRole: (id) => `/users/${id}/role`,
    updateProfile: (id) => `/users/${id}`,
  },
  donationRequests: {
    all: "/donation-requests",
    single: (id) => `/donation-requests/${id}`,
    myRequests: "/donation-requests/my",
    create: "/donation-requests",
    update: (id) => `/donation-requests/${id}`,
    delete: (id) => `/donation-requests/${id}`,
    donate: (id) => `/donation-requests/${id}/donate`,
  },
  funding: {
    all: "/funds",
    giveFund: "/funds",
  },
  donors: {
    search: "/donors/search",
  },
};