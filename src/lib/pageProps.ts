import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';

/**
 * Get data associated with page from markdown file
 * @param {string} page name of page
 */
export async function getPageData(page): Promise<unknown| null> {
  try {
    const content  = await import(`../data/pages/${page}.json`);
    return content.default ;
  } catch (e) {
    return null
  }
}

/**
 * Get Data associated with the app
 */
export async function getConfigData() {
  const data = await import('../data/siteConfig.json');
  return data.default;
}

/**
 * Generates props for static props
 * @param {string} page The name of the page
 * @returns Page Props
 */
export async function getPageProps(
  formTitle: string,
  preview = false,
  previewData = null) {
  const config =  await getConfigData();
  let data = await getPageData(formTitle);
  const pageName = data ? formTitle.toLowerCase() : '404';
  const editorMode = process.env?.EDIT_SITE === 'true';

  if (!data) {
    data = await getPageData(pageName)
  }

  if (preview) {
    const gitHubProps = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: `/src/data/pages/${pageName}.json`,
      parse: parseJson,
    })

    return {
      props: {
        ...gitHubProps?.props,
        config,
        formTitle,
        editorMode
      },
    };
  }

  return {
    props: {
      editorMode,
      formTitle,
      preview: false,
      config,
      file: {
        sha: '',
        fileRelativePath: `/src/data/pages/${pageName}.json`,
        data
      }
    },
  }
}

/**
 * Get full list of static paths
 * @returns {
      "params": { "slug": string[]}
    }[]
 */
export async function getPathsList() {
  try {
    const data  = await import(`../data/staticPaths.json`);
    return data.default?.paths;
  } catch (e) {
    return []
  }
}