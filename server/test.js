import { supabaseAdmin } from "./db/supabase.js";

const testConnection = async () => {
  const { data, error } = await supabaseAdmin
    .from("connection_test")
    .select("*");

  if (error) {
    console.error("Error de conexión:", error.message);
    return;
  }

  console.log("¡Conexión correcta!");
  console.log("Datos recibidos:", data);
};

testConnection();