import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wpxknseeccyblaxsqvpe.supabase.co"
const supabaseKey = "sb_publishable_XAFY4WXGPMlCALti97UsJg_Azce_Udd"

export const supabase = createClient(supabaseUrl, supabaseKey)