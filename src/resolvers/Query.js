function feed(root, { filter, skip, first, orderBy }, context, info) {
  const where = filter
    ? {
        OR: [
          { url_contains: filter },
          { description_contains: filter },
        ],
      }
    : {}

  return context.db.query.links(
    { where, skip, first, orderBy },
    info,
  )
}

module.exports = {
  feed,
}
