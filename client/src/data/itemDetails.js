export let ITEM_DETAILS = {};

export async function loadItemDetails(hubId) {
  try {
    const defaultHub = hubId || 'android';
    const module = await import(`./itemDetails/${defaultHub}.js`);
    const newDetails = module.default || module[`${defaultHub}Details`];
    
    // Clear the existing dictionary completely so memory refs update correctly
    for (const key in ITEM_DETAILS) {
      delete ITEM_DETAILS[key];
    }
    if (newDetails) {
      Object.assign(ITEM_DETAILS, newDetails);
    }
  } catch(err) {
    console.warn(`Could not load details for hub: ${hubId}`, err);
    for (const key in ITEM_DETAILS) {
      delete ITEM_DETAILS[key];
    }
  }
}