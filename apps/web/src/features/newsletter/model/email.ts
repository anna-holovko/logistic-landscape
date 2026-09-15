/**
 * Email Value Object
 *
 * Represents a validated email address in the newsletter domain.
 * Validation happens at construction time.
 */

export class Email {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value.toLowerCase().trim();
  }

  static create(value: string): Email {
    const email = new Email(value);
    email.validate();
    return email;
  }

  private validate(): void {
    if (!this.value || this.value.length === 0) {
      throw new Error("Email cannot be empty");
    }

    if (this.value.length > 254) {
      throw new Error("Email must be less than 254 characters");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.value)) {
      throw new Error("Invalid email format");
    }
  }

  toString(): string {
    return this.value;
  }

  toJSON(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
