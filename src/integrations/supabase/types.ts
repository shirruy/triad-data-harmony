export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      aht_agent_data: {
        Row: {
          agent_name: string
          created_at: string
          id: string
          team_id: string | null
          value: number
        }
        Insert: {
          agent_name: string
          created_at?: string
          id?: string
          team_id?: string | null
          value: number
        }
        Update: {
          agent_name?: string
          created_at?: string
          id?: string
          team_id?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "aht_agent_data_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "aht_team_data"
            referencedColumns: ["id"]
          },
        ]
      }
      aht_metrics: {
        Row: {
          abandon_calls: number
          answered_calls: number
          calls_offered: number
          created_at: string
          id: string
        }
        Insert: {
          abandon_calls?: number
          answered_calls?: number
          calls_offered?: number
          created_at?: string
          id?: string
        }
        Update: {
          abandon_calls?: number
          answered_calls?: number
          calls_offered?: number
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      aht_team_data: {
        Row: {
          created_at: string
          id: string
          name: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          value: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          value?: number
        }
        Relationships: []
      }
      aht_wave_data: {
        Row: {
          created_at: string
          id: string
          value: number
          wave: string
        }
        Insert: {
          created_at?: string
          id?: string
          value: number
          wave: string
        }
        Update: {
          created_at?: string
          id?: string
          value?: number
          wave?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      historical_trend_data: {
        Row: {
          created_at: string
          date: string
          id: string
          metric_type: string
          value: number
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          metric_type: string
          value: number
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          metric_type?: string
          value?: number
        }
        Relationships: []
      }
      performance_alerts: {
        Row: {
          alert_type: string
          created_at: string
          id: string
          is_active: boolean | null
          message: string
          team_id: string | null
          threshold: number
        }
        Insert: {
          alert_type: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          message: string
          team_id?: string | null
          threshold: number
        }
        Update: {
          alert_type?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          message?: string
          team_id?: string | null
          threshold?: number
        }
        Relationships: [
          {
            foreignKeyName: "performance_alerts_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "aht_team_data"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_goals: {
        Row: {
          created_at: string
          current_value: number
          end_date: string
          id: string
          metric_name: string
          start_date: string
          target_value: number
          team_member_id: string
        }
        Insert: {
          created_at?: string
          current_value?: number
          end_date: string
          id?: string
          metric_name: string
          start_date: string
          target_value: number
          team_member_id: string
        }
        Update: {
          created_at?: string
          current_value?: number
          end_date?: string
          id?: string
          metric_name?: string
          start_date?: string
          target_value?: number
          team_member_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "performance_goals_team_member_id_fkey"
            columns: ["team_member_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_logs: {
        Row: {
          created_at: string
          id: string
          log_date: string | null
          metric_type: string
          team_id: string | null
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          log_date?: string | null
          metric_type: string
          team_id?: string | null
          value: number
        }
        Update: {
          created_at?: string
          id?: string
          log_date?: string | null
          metric_type?: string
          team_id?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "performance_logs_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "aht_team_data"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_metrics: {
        Row: {
          created_at: string
          id: string
          name: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          value: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          value?: number
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assignee_id: string | null
          assigner_id: string
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          status: string
          title: string
        }
        Insert: {
          assignee_id?: string | null
          assigner_id: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          status?: string
          title: string
        }
        Update: {
          assignee_id?: string | null
          assigner_id?: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_assigner_id_fkey"
            columns: ["assigner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      team_availability: {
        Row: {
          created_at: string
          end_time: string
          id: string
          start_time: string
          status: string
          team_member_id: string
        }
        Insert: {
          created_at?: string
          end_time: string
          id?: string
          start_time: string
          status?: string
          team_member_id: string
        }
        Update: {
          created_at?: string
          end_time?: string
          id?: string
          start_time?: string
          status?: string
          team_member_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_availability_team_member_id_fkey"
            columns: ["team_member_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      team_collaboration_data: {
        Row: {
          collaboration_score: number
          created_at: string
          id: string
          team_name: string
        }
        Insert: {
          collaboration_score: number
          created_at?: string
          id?: string
          team_name: string
        }
        Update: {
          collaboration_score?: number
          created_at?: string
          id?: string
          team_name?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          name: string
          performance_score: number | null
          role: string
          team_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          name: string
          performance_score?: number | null
          role: string
          team_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          name?: string
          performance_score?: number | null
          role?: string
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "aht_team_data"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          role: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          role: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_new_user: {
        Args: {
          user_id: string
          user_email: string
          user_role: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
