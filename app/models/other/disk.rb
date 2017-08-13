require 'sys/filesystem'

module Other
  class Disk
    attr_reader :total_gb, :available_gb, :percent

    def initialize
      filesys = Sys::Filesystem.stat("/")
      @total_gb = filesys.block_size * filesys.blocks / (1024.0 ** 3)
      @available_gb = filesys.block_size * filesys.blocks_available / (1024.0 ** 3)
      @percent = ((available_gb / total_gb) * 100.0).round(0)
    end
  end
end
