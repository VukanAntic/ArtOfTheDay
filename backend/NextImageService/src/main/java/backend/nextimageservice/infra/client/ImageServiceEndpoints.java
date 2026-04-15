package backend.nextimageservice.infra.client;

public final class ImageServiceEndpoints {

    public static final String GET_ARTWORKS_BY_GENRE = "/api/images/get-artworks-from-genre";
    public static final String GET_ARTWORKS_BY_ARTIST = "/api/images/get-artworks-from-artist";
    public static final String GET_RANDOM_ARTWORK_ID = "/api/images/get-random-artwork-id";

    private ImageServiceEndpoints() {}
}
