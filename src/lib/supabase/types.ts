export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string | null
          email: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          role: string | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string | null
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          role?: string | null
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string | null
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 