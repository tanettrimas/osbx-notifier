// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function getCompaniesFromOsloBors(rows: CheerioElement[]) {
  return rows
    .map((e) =>
      e.children
        .map((child) => {
          if (child.children) {
            const relevantTag = child.children[0];
            if (relevantTag && relevantTag.data) {
              return relevantTag.data.trim().replace(/\n\t/, '');
            }
            if (relevantTag.name === 'a') {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              const thistag = relevantTag.children[0].data!;
              const company = thistag.replace(/\n/, '');
              return company;
            }
          }
          return null;
        })
        .filter((data) => data !== null),
    )
    .map(([date, company, ticket, marked]) => ({ date, company, ticket, marked }));
}
