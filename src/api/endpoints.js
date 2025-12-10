// src/api/endpoints.js

export const ENDPOINTS = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    profile: "/auth/profile",
  },
  users: {
    all: "/users",
    updateStatus: (id) => `/users/${id}/status`,
    updateRole: (id) => `/users/${id}/role`,
    updateProfile: (id) => `/users/${id}`,
  },
  donationRequests: {
    all: "/donation-requests",
    myRequests: (page = 1) => `/donation-requests/my?page=${page}`,
    create: "/donation-requests",
    update: (id) => `/donation-requests/${id}`,
    delete: (id) => `/donation-requests/${id}`,
  },
  funding: {
    all: "/funds",
    giveFund: "/funds",
  },
};
