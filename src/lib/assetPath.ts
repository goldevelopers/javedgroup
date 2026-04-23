const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * Prepends the configured basePath to a public asset path.
 * Use this for all <img src> and <Image src> that reference files in /public.
 * This is required for GitHub Pages (or any sub-path deployment) where
 * Next.js static export does not automatically prepend basePath to image srcs.
 */
export const assetPath = (src: string): string => `${basePath}${src}`;
