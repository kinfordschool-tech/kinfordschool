import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ecazlhecquqtrkcrvejw.supabase.co'
const supabaseAnonKey = 'sb_publishable_zZayN5u637gqPn2h-QqlZw_yYhQ_ZjC'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
