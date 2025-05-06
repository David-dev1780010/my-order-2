
import { User } from '../types';
import { toast } from '@/hooks/use-toast';

export class TokenService {
  /**
   * Check if a user has enough tokens
   */
  static hasEnoughTokens(user: User | null, amount: number = 1): boolean {
    if (!user) return false;
    return user.tokens >= amount;
  }

  /**
   * Consume tokens from a user
   */
  static consumeToken(user: User | null, amount: number = 1): boolean {
    if (!this.hasEnoughTokens(user, amount)) {
      toast({
        title: "Not enough tokens",
        description: "You don't have enough tokens for this action",
        variant: "destructive"
      });
      return false;
    }
    
    // We return true here because the actual token reduction is handled in the AppContext
    return true;
  }

  /**
   * Get token status message
   */
  static getTokenMessage(user: User | null): string {
    if (!user) return "Please log in to use tokens";
    return `You have ${user.tokens} token${user.tokens !== 1 ? 's' : ''} remaining`;
  }
}
