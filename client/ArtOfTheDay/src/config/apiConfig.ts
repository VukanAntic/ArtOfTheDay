export const API_CONFIG = {
    identityService:    process.env.EXPO_PUBLIC_IDENTITY_SERVICE_URL    ?? 'http://localhost:8081',
    imageService:       process.env.EXPO_PUBLIC_IMAGE_SERVICE_URL       ?? 'http://localhost:8080',
    preferenceService:  process.env.EXPO_PUBLIC_PREFERENCE_SERVICE_URL  ?? 'http://localhost:8082',
    nextImageService:   process.env.EXPO_PUBLIC_NEXT_IMAGE_SERVICE_URL  ?? 'http://localhost:8084',
};
