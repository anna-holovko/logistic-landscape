/**
 * Newsletter Feature
 *
 * Public API for newsletter feature.
 */

// Components
export { NewsletterForm } from "./client/components";

// Hooks
export { useNewsletterForm } from "./client/hooks";

// Services
export { apiClient } from "./client/services";

// Use Cases
export { SubscribeNewsletterUseCase } from "./application";

// Domain
export { Email } from "./model";

// Infrastructure
export { InMemoryNewsletterRepository } from "./infrastructure";
