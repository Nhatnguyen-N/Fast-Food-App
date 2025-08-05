import { CreateUserPrams, GetMenuParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite"
export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  platform: "com.nhatt.foodordering",
  databaseId: "68907a7500387b98fc76",
  bucketId: '6891c7c8001a3038e7e5',
  userCollectionId: "6890a88d00366575f567",
  categoriesCollectionId: '6891bb0b002a9e242546',
  menuCollectionId: "6891c1ee000d87dab3a5",
  customizationsCollectionId: '6891c4a8001d9c49d2fe',
  menuCustomizationCollectionId: '6891c61d003b2c19d31c',
}

export const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!)
  .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({ name, email, password }: CreateUserPrams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name)
    if (!newAccount) throw Error;

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { email, name, accountId: newAccount.$id, avatar: avatarUrl }
    )
  } catch (error) {
    throw new Error(error as string)
  }
}
export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw new Error(error as string)
  }
}
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    )
    if (!currentUser) throw Error;
    const userDoc = currentUser.documents[0];
    return {
      ...userDoc,
      email: userDoc.email,
      avatar: userDoc.avatar,
      name: userDoc.name,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error as string)

  }
}
export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];
    if (category) queries.push(Query.equal('categories', category));
    if (query) queries.push(Query.search('name', query));
    const menus = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries
    )
    return menus.documents;

  } catch (error) {
    throw new Error(error as string);
  }
}
export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
    )
    return categories.documents;
  } catch (error) {
    throw new Error(error as string)
  }
}