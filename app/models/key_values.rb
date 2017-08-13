module KeyValues

  class Base < ActiveHash::Base
    def self.find_by_code(code)
      super(code.to_s)
    end

    def self.codes
      self.all.map(&:code)
    end
  end

  class SideBarUrl < KeyValues::Base
    self.data = [
      { code: :home, controller: "api/homes", url: "/", name: "Home", is_public: true },
      { code: :new_job, controller: "api/jobs/new", url: "/jobs/new", name: "New Job", is_public: true },
    ]

    def self.pubilcs
      self.where(is_public: true)
    end
  end
end
