/* import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey) */


/* import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'postgresql://postgres.eykdxcrhukrmzvpkxegq:Tr@vozon3#Complex@aws-0-ap-south-1.pooler.supabase.com:6543/postgres'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5a2R4Y3JodWtybXp2cGt4ZWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0NzQ0MjYsImV4cCI6MjAxNjA1MDQyNn0.nNRe1U0e1evrKO0kSCFDughypNBf7hzi5nGZ_cMhbAU'

export const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kxcdtjxuylcrxymkztyo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4Y2R0anh1eWxjcnh5bWt6dHlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ3NDUwMTYsImV4cCI6MjA0MDMyMTAxNn0.qxBFf7Hz4wN_GXzixB_1sZsLlwWQYJ75URHpJByvrz8'

export const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
