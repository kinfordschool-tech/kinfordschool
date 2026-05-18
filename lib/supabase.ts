import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ecazlhecquqtrkcrvejw.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_zZayN5u637gqPn2h-QqlZw_yYhQ_ZjC'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
