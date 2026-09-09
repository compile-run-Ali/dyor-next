import Image from 'next/image'
import React, { useState } from 'react'

const Home = () => {
  const [errors, setErrors] = React.useState({})
  const [developer_wallet, setDeveloperWallet] = React.useState('')
  const [scam_type, setScamType] = React.useState('')
  const [telegram_username, setTelegramUsername] = React.useState('')
  const [telegram_id, setTelegramId] = React.useState('')
  const [twitter_username, setTwitterUsername] = React.useState('')
  const [project_name, setProjectName] = React.useState('')
  const [project_contract, setProjectContract] = React.useState('')
  const [transactions, setTransactions] = React.useState('')

  const checkform = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    const errors = {}
    if (!data.developer_wallet) {
      setErrors({ ...errors, developer_wallet: 'Developer Wallet is required' })
    }
    if (!data.scam_type) {
      setErrors({ ...errors, scam_type: 'Scam Type is required' })
    }
    if (!data.telegram_username) {
      setErrors({ ...errors, telegram_username: 'Telegram Username is required' })
    }
    if (!data.telegram_id) {
      setErrors({ ...errors, telegram_id: 'Telegram ID is required' })
    }
    if (!data.twitter_username) {
      setErrors({ ...errors, twitter_username: 'Twitter Username is required' })
    }
    if (!data.project_name) {
      setErrors({ ...errors, project_name: 'Project Name is required' })
    }
    if (!data.project_contract) {
      setErrors({ ...errors, project_contract: 'Project Contract is required' })
    }
    if (!data.transactions) {
      setErrors({ ...errors, transactions: 'Transactions is required' })
    }
    if (Object.keys(errors).length === 0) {
      setErrors({})
      setDeveloperWallet('')
      setScamType('')
      setTelegramUsername('')
      setTelegramId('')
      setTwitterUsername('')
      setProjectName('')
      setProjectContract('')
      setTransactions('')
    }
  }

  const handleDeveloperWallet = (e) => {
    setDeveloperWallet(e.target.value)
  }

  const handleScamType = (e) => {
    setScamType(e.target.value)
  }

  const handleTelegramUsername = (e) => {
    setTelegramUsername(e.target.value)
  }

  const handleTelegramId = (e) => {
    setTelegramId(e.target.value)
  }

  const handleTwitterUsername = (e) => {
    setTwitterUsername(e.target.value)
  }

  const handleProjectName = (e) => {
    setProjectName(e.target.value)
  }

  const handleProjectContract = (e) => {
    setProjectContract(e.target.value)
  }

  const handleTransactions = (e) => {
    setTransactions(e.target.value)
  }

  return (
    <main className="workspace font-nunito font-medium">
      <section className="breadcrumb">
        <h1 className='text-[32px] text-muted'>DOGE your own research</h1>
        <ul className='text-[#57534E] text-sm flex mb-4'>
          <li><a href="#">Home</a></li>
          <Image width={12} height={10} className="mx-2 w-3" src="/images/arrow.svg" alt="arrow" />
          <li className='text-muted'>Dashboard</li>
        </ul>
      </section>
      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-3">
          <div
            className="flex items-center justify-center px-4 py-8 text-center transition-transform duration-200 card lg:transform hover:scale-110 hover:shadow-lg"
          >
            <div>
              <span className="text-5xl leading-none text-primary la la-users"></span>
              <p className="mt-2 text-muted">Registered Devs</p>
              <div className="mt-5 text-3xl leading-none text-gold">
                Coming Soon
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-center px-4 py-8 text-center transition-transform duration-200 card lg:transform hover:scale-110 hover:shadow-lg"
          >
            <div>
              <span
                className="text-5xl leading-none text-muted la la-layer-group"
              ></span>
              <p className="mt-2 text-muted">Total Reports</p>
              <div className="mt-5 text-3xl leading-none text-gold">-</div>
            </div>
          </div>
          <div
            className="flex items-center justify-center px-4 py-8 text-center transition-transform duration-200 card lg:transform hover:scale-110 hover:shadow-lg"
          >
            <div>
              <span className="text-5xl leading-none text-primary la la-cube"></span>
              <p className="mt-2 text-muted">KYC & Audit - Partnerships</p>
              <div className="mt-5 text-3xl leading-none text-gold">
                Coming Soon
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-5 mt-5 lg:grid-cols-2 font-nunito_sans text-muted">
        <div className="min-w-0 p-5 card">
          <h3 className='text-xl font-extrabold'>Recently added Scam Wallets</h3>
          <div className="min-w-0 mt-5">
            Coming Soon
          </div>
        </div>
        <div className="p-5 card">
          <h3 className='font-extrabold'>Report a Scam</h3>
          <div className="mt-5">
            <form id="app" className=' font-extrabold' onSubmit={checkform} action="/" method="post">
              <div className="mb-5">
                <label className="block mb-2 label" htmlFor="developer_wallet">
                  Developer Wallet <span className="invalid-feedback">*</span>
                </label>
                <input
                  id="developer_wallet"
                  name="developer_wallet"
                  type="text"
                  className="form-control"
                  placeholder="Developer Wallet"
                  value={developer_wallet}
                  onChange={handleDeveloperWallet}
                />
                {errors?.developer_wallet &&
                  <small
                    className="block mt-2 invalid-feedback">
                    {errors.developer_wallet}
                  </small>}
              </div>
              <div className="mb-5">
                <label className="block mb-2 label" htmlFor="scam_type"
                >Scam Type (Describe what happened)
                  <span className="invalid-feedback">*</span>
                </label>
                <textarea
                  id="scam_type"
                  name="scam_type"
                  className="form-control"
                  rows="4"
                  placeholder="Scam Type"
                  value={scam_type}
                  onChange={handleScamType}
                ></textarea>
                {errors.scam_type &&
                  <small
                    className="block mt-2 invalid-feedback">
                    {errors.scam_type}
                  </small>}
              </div>

              <div className="mb-5">
                <label className="block mb-2 label" htmlFor="telegram_username">
                  Telegram Username
                  <span className="invalid-feedback">*</span>
                </label>
                <div className="input-group">
                  <div className="input-addon input-addon-prepend input-group-item">
                    @
                  </div>
                  <input
                    id="telegram_username"
                    type="text"
                    name="telegram_username"
                    className="form-control input-group-item rounded-l-none"
                    placeholder="Telegram Username"
                    value={telegram_username}
                    onChange={handleTelegramUsername}
                  />
                </div>
                {errors.telegram_username &&
                  <small
                    className="block mt-2 invalid-feedback">
                    {errors.telegram_username}
                  </small>}
              </div>
              <div className="mb-5">
                <label className="block mb-2 label" htmlFor="telegram_id">
                  Telegram ID
                </label>
                <input
                  id="telegram_id"
                  name="telegram_id"
                  type="text"
                  className="form-control"
                  placeholder="Telegram ID"
                  value={telegram_id}
                  onChange={handleTelegramId}
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 label" htmlFor="twitter_username">
                  Twitter Username
                </label>
                <div className="input-group">
                  <div className="input-addon input-addon-prepend input-group-item">
                    @
                  </div>
                  <input
                    id="twitter_username"
                    type="text"
                    name="twitter_username"
                    className="form-control input-group-item rounded-l-none"
                    placeholder="Twitter Username"
                    value={twitter_username}
                    onChange={handleTwitterUsername}
                  />
                </div>
              </div>
              <div className="mb-5">
                <label className="block mb-2 label" htmlFor="title">
                  Project Name <span className="invalid-feedback">*</span>
                </label>
                <input
                  id="project_name"
                  name="project_name"
                  type="text"
                  className="form-control"
                  placeholder="Project Name"
                  value={project_name}
                  onChange={handleProjectName}
                />
                {errors.project_name &&
                  <small
                    className="block mt-2 invalid-feedback">
                    {errors.project_name}
                  </small>}
              </div>
              <div className="mb-5">
                <label className="block mb-2 label" htmlFor="title">
                  Project Contract <span className="invalid-feedback">*</span>
                </label>
                <input
                  id="project_contract"
                  name="project_contract"
                  type="text"
                  className="form-control"
                  placeholder="Project Contract"
                  value={project_contract}
                  onChange={handleProjectContract}
                />
                {errors.project_contract &&
                  <small
                    className="block mt-2 invalid-feedback">
                    {errors.project_contract}
                  </small>}
              </div>
              <div className="mb-5">
                <label className="block mb-2 label" htmlFor="title">
                  Transaction Address
                </label>
                <input
                  id="transactions"
                  name="transactions"
                  type="text"
                  className="form-control"
                  placeholder="Transaction Address"
                  value={transactions}
                  onChange={handleTransactions}
                />
              </div>
              <div className="mb-5">
                <small
                >All fields with (<span className="invalid-feedback">*</span>) are
                  Required.
                </small>
              </div>
              <div className="mt-10">
                <button type="submit" className="uppercase bg-gold py-2 px-5 rounded-full text-white dark:text-primary text-sm">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home