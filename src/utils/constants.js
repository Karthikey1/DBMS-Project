export const API_BASE_URL = 'http://localhost:8080/api'

export const USER_ROLES = {
  ADMIN: 'admin',
  MEMBER: 'member',
  MODERATOR: 'moderator'
}

export const COMMUNITY_TYPES = {
  CULTURAL: 'cultural',
  REGIONAL: 'regional', 
  LINGUISTIC: 'linguistic',
  SOCIAL: 'social'
}

export const EVENT_TYPES = {
  CULTURAL: 'cultural',
  SOCIAL: 'social',
  EDUCATIONAL: 'educational',
  RELIGIOUS: 'religious'
}

export const STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
  THEME: 'theme'
}

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  sortBy: 'created_at',
  sortOrder: 'desc'
}