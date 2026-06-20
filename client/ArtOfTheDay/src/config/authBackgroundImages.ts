const context = (require as any).context(
    '../../assets/images/auth',
    false,
    /\.(jpg|jpeg|png|webp)$/,
);

const authBackgroundImages = context.keys().map((key: string) => context(key));

export default authBackgroundImages;
