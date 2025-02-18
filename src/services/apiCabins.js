import supabase, { supabaseUrl } from "./supabase.js";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. Create or edit cabin
  let query = supabase.from("cabins");

  //1.A Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //1.B Edit
  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  //2. Upload image
  //https://smnaxolrticxeqqyrczk.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. Delete cabin entry IF there was an error uploading cabin image.
  if (storageError) {
    await supabase.storage.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created"
    );
  }

  return data;
}

export async function updateCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .update({ other_column: "otherValue" })
    .eq("id", id)
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be updated");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
