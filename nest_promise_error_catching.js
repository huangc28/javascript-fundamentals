const prom1 = () => {
  return Promise.reject(Error('something happened'));
}

const prom2 = () => {
  return new Promise((res, rej) => {
    res('1')
  })
  .then((v) => {
    return prom1()
  })
  .catch(err => {
    console.error('spot 1', err.message)
    throw err
  })
}

const flow = async () => {
  try {
    await prom2();
  } catch (err) {
    console.error('spot 2', err.message)
  }
}

flow()