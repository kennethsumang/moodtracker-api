import * as bcrypt from 'bcrypt';

export default class HashLibrary {
  static async hash(text: string): Promise<string> {
    return await bcrypt.hash(text, 10);
  }

  static async compare(
    plainText: string,
    hashedText: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainText, hashedText);
  }
}
